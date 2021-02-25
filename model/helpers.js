async function getCollection(db, name) {
  const client = await db
  return await client.db().collection(name)
}

module.exports = { getCollection }
