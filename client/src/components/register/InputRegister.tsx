import {
    FC,
    HTMLInputTypeAttribute,
} from 'react';
import Button from '../global/Button';
import { UseFormRegisterReturn } from 'react-hook-form';

interface InputRegisterProps {
    register: UseFormRegisterReturn;
    label: string;
    buttonContent: string;
    isShowButton: boolean;
    keyForm: string;
    value?: string;
    onNextBtn: (key: any, value: any) => void;
    type?: HTMLInputTypeAttribute;
}

const InputRegister: FC<InputRegisterProps> = ({
    buttonContent,
    isShowButton,
    keyForm,
    label,
    onNextBtn,
    register,
    value,
    type = 'text',
}) => {
    return (
        <div className="space-y-2 pb-4">
            <label className="pl-1 text-[18px] text-[#00cfc8]" htmlFor="">
                {label}
            </label>
            <div className="flex space-y-4 sm:space-y-0 sm:space-x-4 flex-col sm:flex-row">
                <input
                    className="flex-1 p-2 rounded-sm border-[#202637] bg-white/10 text-white"
                    type={type}
                    {...register}
                />
                {isShowButton && (
                    <Button
                        type="button"
                        variant={'ghost'}
                        onClick={() => onNextBtn(keyForm, value)}
                    >
                        {buttonContent}
                    </Button>
                )}
            </div>
        </div>
    );
};

export default InputRegister;
