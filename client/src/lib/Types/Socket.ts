export enum LIKE_ENUM {
    REMOVE = 'REMOVE',
    UPDATE = 'UPDATE',
}

export interface I_Socket_Like {
    type: LIKE_ENUM;
    data: {
        postId: string;
        userId: string;
    };
}
