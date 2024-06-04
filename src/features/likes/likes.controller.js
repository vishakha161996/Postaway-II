import LikeRepository from "./likes.repository.js";

export default class LikeController{
    constructor(){
        this.likeReository = new LikeRepository();
    }
    async toggleLike(req, res){
        try {
            const userId = req.userId;
            const postId = req.body.postId;
            const commentId = req.params.commentId;
            const result = await this.likeReository.toggleLike(userId, postId, commentId);
            res.status(200).send(result);
        } catch (error) {
            res.status(error.statusCode || 500).json({ error: error.message });
        }
    }
    async getLike(req, res){
        try {
            const postId = req.body.PostId;
            const commentId = req.params.commentId;
            const result = await this.likeReository.getLikes(postId, commentId);
            res.status(200).send(result);
        } catch (error) {
            res.status(error.statusCode || 500).json({ error: error.message });

        }
    }
}