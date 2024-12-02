module.exports = (request, response) => {
  let who = 'anonymous';

  if (request.body && request.body.who) {  // post with who:45gtg
    who = request.body.who;
  } else if (request.query
                 .who) {  // get with http://localhost:3000/api?who=fsfgs--
    who = request.query.who;
  } else if (request.cookies.who) {
    who = request.cookies.who;
  }

  response.status(200).send(`Hello ${who}!`);
  // response.json(obj);
};