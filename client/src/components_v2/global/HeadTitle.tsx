import Head from 'next/head';
import { FC } from 'react';

interface HeadTitleProps {
    title?: string;
    content?: string;
    name?: string;
    keyData?: string;
}

const HeadTitle: FC<HeadTitleProps> = ({
    title = 'HappyTato',
    content = 'Happy tato | banhTheCake',
    name = 'happytato',
    keyData = 'happytato',
}) => {
    return (
        <Head>
            <title>{title}</title>
            <meta name={name} content={content} key={keyData} />
        </Head>
    );
};

export default HeadTitle;
