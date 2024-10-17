export const getWaterStatsController = async (req, res) => {
  // 1. get current user from auth
  // 2. get user from the DB
  // 3. get users water notes
  // 4. calculate percentage and return data back.

  res.status(200).json({
    message: 'It works!',
    data: { test: 'hello' },
  });
};
