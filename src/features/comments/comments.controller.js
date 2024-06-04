import CommentsRepository from "./comments.repository.js";

export default class CommentController{
    constructor(){
        this.commentsRepository = new CommentsRepository();
    }

    async addComment(req, res){
        try {
            const userId = req.userId;
      const newComment = await this.commentsRepository.addComment(req.params.postId, userId, req.body);
      res.status(201).json(newComment);
        } catch (error) {
            res.status(error.statusCode || 500).json({ error: error.message });
        }
    }
     async getCommentByPost(req, res){
        try {
            const postId = req.params.postId;
      const comments = await this.commentsRepository.getCommentByPost(postId);
      res.status(200).json(comments);
        } catch (error) {
            res.status(error.statusCode || 500).json({ error: error.message });
            
        }
     }

     async updateComment(req, res){
        try {
            const commentId = req.params.commentId;
      const newText = req.body.text;
      const updatedComment = await this.commentsRepository.updateComment(commentId, newText);
      res.status(200).json(updatedComment);
        } catch (error) {
            res.status(error.statusCode || 500).json({ error: error.message });
        }
     }
     async deleteComment(req, res){
        try {
            const commentId = req.params.commentId;
      const deletedComment = await this.commentsRepository.deleteComment(commentId);
      res.status(200).json(deletedComment);
        } catch (error) {
            res.status(error.statusCode || 500).json({ error: error.message });
        }
     }
}