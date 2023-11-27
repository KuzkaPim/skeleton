import { useHttp } from "./http.hook"

const SkeletonService = () => {
    const { request } = useHttp();
    const _base = "https://jsonplaceholder.typicode.com/comments";

    const getComments = async (page) => {
        const comments = await request(`${_base}?_page=${page}`);
        return comments;
    }

    return {
        getComments
    }
}

export default SkeletonService;