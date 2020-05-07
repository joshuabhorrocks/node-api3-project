const server = require('./server.js');

const userRouter = require("./users/userRouter");
const postRouter = require("./posts/postRouter");

server.use("/api/users", userRouter)

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`\n* Server Running on http://localhost:${port} *\n`);
});
