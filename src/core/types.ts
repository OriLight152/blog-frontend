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