
var rooms = {};
const admin = new Map();

async function connectSocket(io) {
        io.on("connection",(socket) => {
            console.log("socket in server", socket.id);
            
            socket.on("typing",(roomId) => {
              socket.broadcast.to(roomId).emit("user-typing");
            })

            socket.on("stop-typing",(roomId) => {
              socket.broadcast.to(roomId).emit("user-stop-typing");
            })

            socket.on("send-show-ty",({ typ , roomId}) => {
              socket.broadcast.to(roomId).emit("show-ty", typ);
            })

            socket.on("send-msg",({ roomId , msg , socketId , timestamp}) => {
              io.to(roomId).emit("receive-msg",{ msg , socketId, timestamp });
            })

            socket.on("start-recording" , (roomId) => {
              socket.broadcast.to(roomId).emit("st-recording");
            })

            socket.on("stop-recording", (roomId) => {
              socket.broadcast.to(roomId).emit("stp-recording");
            })

            socket.on("check-room-size",(roomId) => {
              const socInRoom = io.sockets.adapter.rooms.get(roomId);
              const size = socInRoom ? socInRoom.size : 0;
              console.log("room size",size);
              socket.emit("know-room-size", size); 
            })

            socket.on("new-room-size",(room) => {
              const newSize = io.sockets.adapter.rooms.get(room);
              const newLen = newSize ? newSize.size : 0;
              io.to(room).emit("room-size", newLen);
            })

            socket.on("request-join-room", ({ user , name , roomId }) => {
              io.to(roomId).emit("user-requesting-to-join" , { user , name , roomId });
            })

            socket.on("request-accepted", ({ joiner , setPeers }) => {
              // console.log("request to room accepted", socket.id , joiner);
              io.to(joiner).emit("request-acc" , { setPeers });
            })

            socket.on("request-rejected",({joiner}) => {
              io.to(joiner).emit("request-rej");
            })

            socket.on("pod-joined", (roomId) => {
              socket.broadcast.to(roomId).emit("pod-j");
            })

            socket.on('join', (roomId) => {
              console.log("new user want to join");
              socket.join(roomId);
              const clientsInRoom = io.sockets.adapter.rooms.get(roomId);
              const numClients = clientsInRoom ? clientsInRoom.size : 0;
              console.log("room size in join",numClients);
              if(numClients === 1){
                admin.set(roomId , socket.id);
              }
              let adminSocket = admin.get(roomId);
              console.log("admin",adminSocket);
              io.to(adminSocket).emit("ur-admin", { roomId, socket : adminSocket});
              io.to(roomId).emit("room-size", numClients);
              if (!rooms[roomId]) rooms[roomId] = [];
              rooms[roomId].push(socket.id);
              const otherUsers = rooms[roomId].filter(id => id !== socket.id);
              socket.emit('all-users', otherUsers);
              otherUsers.forEach(id => {
              socket.to(id).emit('user-joined', socket.id);
              });

              socket.on('signal', ({ target, signal }) => {
               io.to(target).emit('signal', { caller: socket.id, signal });
              });

              socket.on('disconnect', () => {
               for (const room in rooms) {
                 const adminId = admin.get(room);
                 if(adminId === socket.id){
                  io.to(room).emit("admin-disconnected");
                 }
                 rooms[room] = rooms[room].filter(id => id !== socket.id);
                 socket.broadcast.emit('user-left', socket.id , room);
               }
               });
            });

            // socket.on("join-room",async (val , soc) => {
            //   // const sockets = await io.in(val).allSockets();

            //   const usersInRoom = room[val] || [];

            //   const clientsInRoom = io.sockets.adapter.rooms.get(val);
            //   const numClients = clientsInRoom ? clientsInRoom.size : 0;

            //   if(numClients >= 5){
            //     socket.emit("room-full");
            //     return;
            //   }

            //   if(!room[val]) room[val] = [];

            //   room[val].push(socket.id);

            //   const otherUsers = room[val].filter(id => id !== socket.id);
            //   socket.emit('all-users', otherUsers);
            //   otherUsers.forEach(id => {
            //     socket.to(id).emit('user-joined', socket.id);
            //   });

            //   socket.on('signal', ({ target, signal }) => {
            //     io.to(target).emit('signal', { caller: socket.id, signal });
            //   });

            //   console.log("size",numClients,soc);
            //   socket.join(val);

            //   io.to(val).emit("user-joined", {soc , val});
            //   console.log("roomid",val);
            //   console.log(`Socket ${socket.id} joined room ${val}`);

            //   socket.on('disconnect', () => {
            //      for (const roo in room) {
            //        room[roo] = room[roo].filter(id => id !== socket.id);
            //        socket.broadcast.emit('user-left', socket.id);
            //      }
            //   });

            //   // socket.emit('room-size', numClients);
            // })

            // socket.on("offer",({ to , offer , roomId})=>{
            //   // io.to(roomId).emit("offer",{from : socket.id , offer , roomId});
            //   console.log("socket.id in server in offer",socket.id);
            //   io.to(to).emit("offer",{from : socket.id, offer , roomId});
            // })

            // socket.on("answer",({ to , answer ,roomId})=>{
            //   // io.to(roomId).emit("answer", { from : socket.id , answer});
            //   console.log("socket.id in server in answer",socket.id);
            //   io.to(to).emit("answer", { from : socket.id , answer});
            // })

            // socket.on("ice-candidate",({ to , candidate})=>{
            //   io.to(to).emit("ice-candidate",{ from : socket.id , candidate});
            // })

            // socket.on("disconnect",()=>{
            //   console.log("socket disconnected");
            // })
        })
}

module.exports = {
    connectSocket ,
}