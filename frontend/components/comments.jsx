import React, { useState, useEffect, useCallback } from 'react';
import { SendHorizonal } from 'lucide-react';
import { Button } from './ui/button';
import { handleSuccessToast } from '@/lib/toast -message';
import { FaSpinner } from 'react-icons/fa6';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const Comments = ({ productId }) => {
  const [isLoding, setIsLoding] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));
  const [commentData, setCommentData] = useState({
    comment: '',
    userId: user?._id,
    productId: productId
  });
  const [comments, setComments] = useState([]);

  // Fetch all comments for this product
  const getCommentData = useCallback(async () => {
    try {
      const res = await fetch(`${apiUrl}/api/comment/${productId}`);
      const result = await res.json();
      if (result?.success) {
        setComments(result?.data || []);
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  }, [productId]);

  // Handle comment post
  const handleCommentPost = async (e) => {
    e.preventDefault();
    try {
      setIsLoding(true);
      const token = JSON.parse(localStorage.getItem('token'));
      const res = await fetch(`${apiUrl}/api/comment/post-comment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token || ''
        },
        body: JSON.stringify(commentData)
      });
      const result = await res.json();
      setIsLoding(false);
      if (result?.success) {
        handleSuccessToast(result?.message);
        setCommentData({ ...commentData, comment: '' });
        getCommentData();
        setIsLoding(false);
      }
    } catch (error) {
      console.error('Error posting comment:', error);
      handleSuccessToast('Something went wrong. Please try again.');
      setIsLoding(false);
    }
  };

  useEffect(() => {
    if (productId) getCommentData();
  }, [productId, getCommentData]);

  return (
    <div className="bg-white border border-gray-200 rounded-3xl shadow-xl p-8 lg:p-10 max-h-[700px] overflow-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        💬 User Comments
      </h2>

      {/* Add Comment */}
      <form onSubmit={handleCommentPost} className="mb-6">
        <textarea
          rows={4}
          name="comment"
          value={commentData.comment}
          onChange={(e) =>
            setCommentData({ ...commentData, comment: e.target.value })
          }
          placeholder="Write a comment..."
          className="w-full border border-gray-300 bg-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black resize-none text-gray-800 shadow-inner"
        />
        <div className="mt-3 flex justify-end">
          <Button className="bg-gradient-to-r from-black to-gray-800 text-white hover:opacity-90 flex items-center gap-2 px-4 py-2 text-sm shadow-md">
            {isLoding ? (
              <FaSpinner className=" animate-spin" />
            ) : (
              <>
                Post Comment <SendHorizonal size={18} />
              </>
            )}
          </Button>
        </div>
      </form>

      {/* Comments List */}
      <div className="space-y-6 text-sm">
        {comments.length === 0 ? (
          <p className="text-gray-500">No comments yet.</p>
        ) : (
          comments.map((cmt) => (
            <div
              key={cmt._id}
              className="border-t border-gray-300 transition-all"
            >
              <p className="font-semibold text-gray-700 capitalize">
                {cmt?.userId?.name || 'Anonymous'}
              </p>
              <p className="text-gray-600 capitalize">{cmt?.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Comments;
