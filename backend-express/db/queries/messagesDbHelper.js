const { request } = require("express");

/**
 * Get all messages for request
 * @param {integer} request_id
 * @return {Promise<{}>} A promise containt offers data and provider who made the offer.
 */
 const getAllMessagesForRequest = function (db, request_id) {
  // old query "select * from offers join requests on offers.request_id = requests.id where requests.client_id=$1"
  const query = `SELECT * FROM messages
  WHERE request_id = $1
  ORDER BY time_sent ASC;`;
  const queryParams = [request_id];
  return db.query(query, queryParams).then((result) => {
    console.log(result.rows);
    return result.rows;
  });
};

/**
 * Add Message forrequest
 * @param {integer} request_id
 * @param {integer} from_id
 * @param {integer} to_id
 * @param {integer} time_sent
 * @return {Promise<{}>} A promise containt offers data and provider who made the offer.
 */
 const addMessageForRequest = function (db, request_id, from_id, to_id, time_sent, message) {
  // old query "select * from offers join requests on offers.request_id = requests.id where requests.client_id=$1"
  console.log("addMessageForRequest ", message);
  const query = `INSERT INTO messages (request_id, from_id, to_id, time_sent, message)
  VALUES ($1, $2, $3, to_timestamp($4/1000.0), $5)
  RETURNING *;`;
  const queryParams = [request_id, from_id, to_id, time_sent , message];
  return db.query(query, queryParams).then((result) => {
    console.log(result.rows);
    return result.rows[0];
  });
};



module.exports = {
  getAllMessagesForRequest,
  addMessageForRequest
}