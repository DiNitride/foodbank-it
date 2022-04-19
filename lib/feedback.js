import db from './db'

export async function selectFeedback() {
  let feedback = await db.query('SELECT FeedbackId, \
  FeedbackText, \
  FeedbackReviewed, \
  FeedbackRecieved, \
  DATE_FORMAT(FeedbackRecieved, "%H:%i %W %M %Y") as PrettyFeedbackRecieved, \
  User.UserForename, \
  User.UserSurname \
  FROM Feedback \
  LEFT JOIN User ON Feedback.FeedbackReviewedBy = User.UserId')
  await db.end()
  return feedback
}

export async function selectFeedbackById(id) {
  let feedback = await db.query('SELECT FeedbackId, \
  FeedbackText, \
  FeedbackReviewed, \
  FeedbackRecieved, \
  DATE_FORMAT(FeedbackRecieved, "%H:%i %W %M %Y") as PrettyFeedbackRecieved, \
  User.UserForename, \
  User.UserSurname \
  FROM Feedback \
  LEFT JOIN User ON Feedback.FeedbackReviewedBy = User.UserId \
  WHERE FeedbackId = ?', [id])
  await db.end()
  return feedback[0]
}

export async function insertFeedback(text) {
  let { insertId } = await db.query('INSERT INTO Feedback VALUES (NULL, ?, 0, NULL, NOW())', [text])
  await db.end()
  return insertId
}

export async function reviewFeedback(feedbackId, reviewerId) {
  await db.query('UPDATE Feedback SET FeedbackReviewed = 1, FeedbackReviewedBy = ? WHERE FeedbackId = ?', [reviewerId, feedbackId])
  await db.end()
}
