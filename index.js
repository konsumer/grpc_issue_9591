const grpc = require('grpc')
const resolve = require('path').resolve

const server = new grpc.Server()
const proto = grpc.load({
  file: resolve(__dirname, 'proto/demo/rpc/helloworld.proto'),
  root: resolve(__dirname, 'proto')
})

server.addProtoService(proto.demo.Greeter.service, {
  sayHello: (ctx, cb) => {
    const message = `Hello ${ctx.request.name}.`
    cb(null, {message})
  }
})

server.bind('localhost:50051', grpc.credentials.createInsecure())
