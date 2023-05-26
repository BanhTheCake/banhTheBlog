import { OurFileRouter } from '@/app/api/uploadthing/core';
import { generateReactHelpers } from '@uploadthing/react/hooks';

export interface IFileUpload {
    fileKey: string;
    fileUrl: string;
}

const useUpload = () => {
    const { useUploadThing } = generateReactHelpers<OurFileRouter>();
    const { startUpload, isUploading } = useUploadThing({
        endpoint: 'imageUploader',
    });
    const onUpload = async (file: File) => {
        const data = (await startUpload([file])) as IFileUpload[];
        return data?.[0]?.fileUrl;
    };

    return { onUpload, isUploading };
};

export default useUpload;
