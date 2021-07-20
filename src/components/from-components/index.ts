import Input from '@/components/from-components/input';
import Select from '@/components/from-components/select';

// 用于动态渲染表单组件；在 page-list 和 page-form 使用到；
export const formComponents = {
    Input,
    Select,
};

export type FormComponentType = keyof typeof formComponents;
export default formComponents;
