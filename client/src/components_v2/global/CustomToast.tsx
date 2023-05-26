import { toast, Toaster, ToastBar } from 'react-hot-toast';

const CustomToaster = () => (
    <Toaster
        toastOptions={{
            className: '!bg-transparent !p-0 !w-full',
            style: {
                // maxWidth: '100%',
            },
        }}
        position="bottom-right"
    >
        {(t) => (
            <ToastBar toast={t}>
                {(data) => (
                    <>
                        <div
                            className="p-4 rounded-md bg-black/95 text-white shadow-md w-[350px] max-w-full"
                            onClick={() => toast.dismiss(t.id)}
                        >
                            <p className="capitalize pb-1.5 font-semibold">
                                {t.type}
                            </p>
                            <p className="">{t.message?.toString()}</p>
                        </div>
                    </>
                )}
            </ToastBar>
        )}
    </Toaster>
);

export default CustomToaster;
