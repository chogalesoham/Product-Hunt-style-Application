import commentModel from '../Models/comment-model.js';

const postNewComment = async (req, res) => {
  try {
    const { comment, userId, productId } = req.body;

    const existingComment = await commentModel.findOne({ productId, userId });
    if (existingComment) {
      existingComment.comment = comment;
      await existingComment.save();
      return res.status(200).json({
        success: true,
        message: 'Comment updated successfully',
      });
    }

    const newComment = new commentModel({ comment, userId, productId });
    await newComment.save();
    res.status(201).json({
      success: true,
      message: 'Comment posted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

const getCommentsByProductId = async (req, res) => {
  try {
    const { productId } = req.params;
    const comments = await commentModel
      .find({ productId })
      .populate('userId', 'name')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: 'All comments for this product',
      data: comments,
    });
  } catch (error) {
    console.error('Error in getCommentsByProductId:', error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

export { postNewComment, getCommentsByProductId };
