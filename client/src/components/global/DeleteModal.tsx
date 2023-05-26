import * as Dialog from '@radix-ui/react-dialog';
import { FC } from 'react';
import Button from './Button';

interface DeleteModalProps {
    open: boolean;
    onClose: () => void;
    onDelete: (...args: any) => void;
    isLoading: boolean;
}

const DeleteModal: FC<DeleteModalProps> = ({
    open,
    onClose,
    onDelete,
    isLoading,
}) => {
    return (
        <Dialog.Root open={open}>
            <Dialog.Portal>
                <Dialog.Overlay
                    className="fixed inset-0 bg-black/20 z-50"
                    onClick={onClose}
                />
                <Dialog.Content className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-md animate-fadeIn animate-duration-100 shadow-sm p-6 pb-4 bg-white flex flex-col space-y-6 z-50">
                    <div className="flex space-y-1 flex-col">
                        <h3 className="text-xl font-semibold">
                            Are your sure you wanna delete this ?
                        </h3>
                        <p className="text-black/60">
                            This will delete your post from database
                        </p>
                    </div>
                    <div className="flex space-x-4 items-center justify-end">
                        <Button
                            variant={'text'}
                            className="border-none"
                            onClick={onClose}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant={'secondary'}
                            className="bg-red-500 hover:bg-red-600 shadow-sm"
                            onClick={onDelete}
                            isLoading={isLoading}
                        >
                            Delete
                        </Button>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};

export default DeleteModal;
