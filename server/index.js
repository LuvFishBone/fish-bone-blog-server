import 'source-map-support/register'
import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import path from 'path'
import koaStatic from 'koa-static'
import logger from 'koa-logger'
import helmet from 'koa-helmet'
import cors from 'koa-cors'
import onerror from 'koa-onerror'
import routing from './routes/'
import {port} from './config'

const app = new Koa()

onerror(app)

app
    .use(cors({
        maxAge: 7 * 24 * 60 * 60,
        credentials: true,
        methods: 'GET, HEAD, OPTIONS, PUT, POST, PATCH, DELETE',
        headers: 'Content-Type, Accept, AuthToken'
    }))
    .use(koaStatic(
        path.join( __dirname,  './static')
    ))
    .use(logger())
    .use(bodyParser())
    .use(helmet())

routing(app)

app.listen(port, () => console.log(`😎  The server is running at http://localhost:${port}/`))