export interface PostData {
    pid: number,
    title: string,
    text: string,
    like: number,
    viewCount: number,
    allowComment: number,
    createdAt: string,
    user: UserData,
    _count: {
        comments: number
    }
}

export interface PostDetailData {
    pid: number,
    title: string,
    text: string,
    author: number,
    publish: boolean,
    like: number,
    password: null,
    viewCount: number,
    allowComment: number,
    createdAt: string,
    updatedAt: string,
    user: UserData
}

export interface CommentData {
    cid: number,
    text: string,
    replyTo: number | null,
    like: number,
    dislike: number,
    createdAt: string,
    user: UserData
}

export interface UserData {
    uid: number,
    nickname: string,
    avatar: string
}

export interface UserProfile {
    uid: number,
    name: string,
    nickname: string,
    sex: string,
    status: number,
    role: string,
    avatar: string,
}

export interface newPostData {
    title: string,
    content: string
}

export interface AdminUserData {
    uid: number,
    name: string,
    email: string,
    nickname: string,
    sex: string,
    status: number,
    role: string,
    avatar: string,
    createdAt: string,
    loggedAt: string,
    _count: {
        posts: number,
        comments: number
    }
}

export interface AdminPostData {
    pid: number,
    title: string,
    text: string,
    like: number,
    viewCount: number,
    allowComment: number,
    createdAt: string,
    updatedAt: string,
    user: {
        uid: number,
        name: string,
        nickname: string
    },
    _count: {
        comments: number
    }
}

export interface AdminCommentData {
    cid: number,
    text: string,
    ip: string,
    agent: string,
    replyTo: null | number,
    status: number,
    createdAt: string,
    user: {
        uid: number,
        name: string,
        nickname: string
    },
    post: {
        pid: number,
        title: string
    }
}