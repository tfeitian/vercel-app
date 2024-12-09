// import * as edgedb from 'edgedb';

// const client = edgedb.createClient({
//   // Note: these options aren't needed for your project deployed on Vercel,
//   // they will be automatically found from environment variables
//   instanceName: 'vercel-WdA2gr3TsoJSJ4o7CAQEKPsP/edgedb-user-storage',
//   secretKey:
//       'nbwt1_eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJlZGIuZC5hbGwiOnRydWUsImVkYi5pIjpbInZlcmNlbC1XZEEyZ3IzVHNvSlNKNG83Q0FRRUtQc1AvZWRnZWRiLXVzZXItc3RvcmFnZSJdLCJlZGIuci5hbGwiOnRydWUsImlhdCI6MTczMzEzNTIyMSwiaXNzIjoiYXdzLmVkZ2VkYi5jbG91ZCIsImp0aSI6Ijk0MnRETENYRWUtcnBYX0t0SDZTemciLCJzdWIiOiI5emZOa3JDWEVlLThaaHZ0Y0hTVjFnIn0.kcbegUciqff6oXr7lWq4jN0DoGITAzFsiwvfRLfZzrkfSZyiNe9vYDF9GwBywH7zIAbESWsmGYZXeoxy1wHlLQ'
// });

// const result = await client.query('select 1 + 2');
import { Redis } from '@upstash/redis';

// Initialize Redis
const redis = Redis.fromEnv();

module.exports = async (request, response) => {
  let who = 'anonymous';

  if (request.body && request.body.email) {  // post with who:45gtg
    who = request.body.email;
    var filename = request.body.email
    filename = filename.concat(request.body.mid);
    var status = await redis.set(filename, JSON.stringify(request.body));
  } else if (request.query
    .who) {  // get with http://localhost:3000/api?who=fsfgs--
    who = request.query.who;
  } else if (request.cookies.who) {
    who = request.cookies.who;
  }

  response.status(200).send(`Hello ${who} at ${request.body.company} call ${request.body.phone} ${filename} ${status}!`);
  // response.json(obj);
};