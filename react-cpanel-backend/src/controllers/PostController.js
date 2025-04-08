const { PostListService, PostDetailsService, PostAddService } = require("../services/PostService");


exports.AddPost = async (req, res) => {
    try {
        let result = await PostAddService(req);
        return res.status(200).json(result); // Ensure JSON response
      } catch (e) {
        return res.status(500).json({ status: "Fail", data: e.toString() }); // Ensure JSON error response
      }
}

exports.PostList = async (req, res) =>{
    try {
        let result = await PostListService();
        return res.status(200).json(result); // Ensure JSON response
      } catch (e) {
        return res.status(500).json({ status: "Fail", data: e.toString() }); // Ensure JSON error response
      }
}

exports.PostDetails = async (req, res) => {
    try {
        const id = req?.params?.id
        let result = await PostDetailsService(id)
        return res.status(200).json(result)
    } catch (error) {
        return res.status(500).json({ status: "Fail", data: e.toString() }); // Ensure JSON error response
    }
}