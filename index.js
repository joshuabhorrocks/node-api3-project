const server = require('./server.js');

const userRouter = require("./users/userRouter");
const postRouter = require("./posts/postRouter");

server.use("/api/users", userRouter)

server.listen(5000, () => {
  console.log('\n* Server Running on http://localhost:5000 *\n');
});
