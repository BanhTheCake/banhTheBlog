const ENV = {
    graphQL: process.env.NEXT_PUBLIC_BACK_END_GRAPHQL as string,
    socket: process.env.NEXT_PUBLIC_BACK_END_SOCKET as string,
};

export default ENV;
