import { Input } from 'antd';

// 用于动态渲染表单组件；在 page-list 和 page-form 使用到；
export const formComponents = {
    Input,
};

export type FormComponentType = keyof typeof formComponents;
