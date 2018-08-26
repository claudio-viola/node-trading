import * as SequelizeStatic from 'sequelize'
import { Database } from './interfaces'
import * as Umzug from 'umzug'
import * as decamelize from 'decamelize'

const defaultConfig: Database.Config = {
  dialect: 'mysql',
  host: '127.0.0.1',
  port: 3306
}

let client: Database.Client

export async function init (): Promise<Database.Client> {
  // Config and client setup
  const envConfig: Database.Config = collectEnvironmentSettings()
  const conf = Object.assign({}, defaultConfig, envConfig)
  const dbLogging = ['true', '1'].indexOf(process.env.DATABASE_LOGGING) !== -1
  if (dbLogging) {
    conf.logging = console.log
  } else {
    conf.logging = false
  }
  client = createClient(conf)

  // Init connection and run migrations
  client.authenticate()
  const migrator = new Umzug({
    storage: 'sequelize',
    storageOptions: {
      tableName: `migrations_sequelize`,
      sequelize: client
    },
    migrations: {
      params: [
        client.getQueryInterface(), // queryInterface
        client.constructor,
        client
      ]
    }
  })
  try {
    await migrator.up()
  } catch (e) {
    console.error(e, e.stack)
  }
  return client
}

export function registerModels<Dao> (
  Models: {[key: string]: Database.DefineAttributes},
  ModelsOptions?: any
  // ModelsOptions?: {[key: any] : Database.DefineOptions<Dao>}
) {
  const models: any = {}
  for (let name in Models) {
    if (ModelsOptions !== undefined && ModelsOptions.hasOwnProperty(name + 'Options')) {
      models[name] = createModel(name, Models[name], ModelsOptions[name + 'Options'])
    } else {
      models[name] = createModel(name, Models[name])
    }
  }
  return models
}

export function createModel<TAttributes>
(modelName: string, attributes: Database.DefineAttributes,
 options?: Database.DefineOptions<Database.Instance<TAttributes>>):
SequelizeStatic.Model<Database.Instance<TAttributes>, { [x: string]: any; }> {
  // Need an active client to define models
  if (!client) throw new Error('MISSING_SEQUELIZE_CLIENT')
  const seqOptions = Object.assign({}, {
    tableName: decamelize(modelName),
    underscored: true
  }, options)
  return client.define(modelName, attributes, seqOptions)
}

function collectEnvironmentSettings (): Database.Config {
  const envConfig: Database.Config = {}
  // Setup environment config variables
  if ('DATABASE_HOST' in process.env) {
    envConfig.host = process.env.DATABASE_HOST
  }

  if ('DATABASE_PORT' in process.env) {
    envConfig.port = parseInt(process.env.DATABASE_PORT, 10)
  }

  if ('DATABASE_USERNAME' in process.env) {
    envConfig.username = process.env.DATABASE_USERNAME
  }

  if ('DATABASE_PASSWORD' in process.env) {
    envConfig.password = process.env.DATABASE_PASSWORD
  }

  if ('DATABASE_NAME' in process.env) {
    envConfig.database = process.env.DATABASE_NAME
  }
  return envConfig
}

function createClient (conf: Database.Config): Database.Client {
  if ('DATABASE_CONNECTION_URL' in process.env) {
    return new SequelizeStatic(process.env.DATABASE_CONNECTION_URL, conf)
  } else {
    if (conf.username && conf.password && conf.database && conf.host && conf.port) {
      return new SequelizeStatic(conf)
    } else {
      throw new Error('INVALID_CONFIGURATION')
    }
  }
}

export default {
  init,
  registerModels
}
