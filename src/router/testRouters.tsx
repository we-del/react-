/* 
 * 2022/5/8 16:55
 * author: xxx
 * @description:
 */

import TodoList from "../test/todolist/TodoList";
import MenuShow from "../test/MenuShow";
import Layout from "../test/LayoutTest";
import DayJSTest from "../test/DayJSTest";
import A from "../test/newFeature/CurNewFeature";
import AA from "../test/contextUse/ClassMode/AA";
import Fa from "../test/contextUse/FunctionMode/Fa";
import SendAsync from "../test/Redux_kit_async";
import TableTest from "../test/antd/TableComponents";
import ModalTest from "../test/antd/ModalTest";
import FormTest from "../test/antd/FormTest";
import InputText from "../test/antd/InputTest";
import UpdateTest from "../test/antd/UPdateTest";
import ImageTest from "../test/antd/ImageTest";
import FormUpdateTest from "../test/antd/FormUpdateTest";
import UploadDemo from "../test/antd/UpoadDemo";
import TreeTest from "../test/antd/TreeTest";
import PageNav from "../test/pageNav/PageNav";
import Virtual from "../test/visual/Virtual";
import TestUse from '../test/useTest/UseTest';

import TodoList_plus from "../test/review/todolist/Todolist";

export default [
    {
        path: "/todolist",
        element: <TodoList/>
    },
    {
        name: 'TodoListPlus',
        path: "/todolist-plus",
        element: <TodoList_plus/>
    },
    {
        path: "/menushow",
        element: <MenuShow/>
    },
    {
        path: "/layout",
        element: <Layout/>

    },
    {
        path: "/dayjs",
        element: <DayJSTest/>

    },
    {
        path: "/newfeature",
        element: <A/>
    },
    {
        path: "/contextC",
        element: <AA/>

    },
    {
        path: "/contextF",
        element: <Fa/>
    }
    ,
    {
        path: "/sendasync",
        element: <SendAsync/>
    },
    {
        path: "/table",
        element: <TableTest/>
    }
    , {
        path: "/modal",
        element: <ModalTest/>
    }
    ,
    {
        path: "/form",
        element: <FormTest/>
    }
    ,
    {
        path: "/input",
        element: <InputText/>
    }
    ,
    {
        path: "/update",
        element: <UpdateTest/>
    }
    ,
    {
        path: "/image",
        element: <ImageTest/>
    }
    ,
    {
        path: "/form-update",
        element: <FormUpdateTest/>
    },
    {
        path: "/upload",
        element: <UploadDemo/>
    }
    , {
        path: "/tree",
        element: <TreeTest/>
    },
    {
        path: "/pageNav",
        element: <PageNav/>
    },
    {
        path: "/virtual",
        element: <Virtual/>
    },
    {
        path: "/use",
        element: <TestUse/>
    }
]