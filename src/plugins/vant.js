import { Loading } from "vant";
import {
    Button,
    NavBar,
    Form,
    Field,
    CellGroup,
    Toast,
    Tabbar,
    TabbarItem,
    Icon,
    Cell,
    Search,
    Swipe,
    SwipeItem,
    Grid,
    GridItem,
    Sidebar,
    SidebarItem,
    Tab,
    Tabs,
    Image as VanImage,
    Lazyload,
    SubmitBar,
    Empty, 
    ActionBar, 
    ActionBarIcon, 
    ActionBarButton,
    ActionSheet,
    Checkbox,
    SwipeCell,
    Stepper,
} from 'vant';


export const setUpVant = (app) => {
    return app.use(Button)
        .use(NavBar)
        .use(Form)
        .use(Field)
        .use(CellGroup)
        .use(Toast)
        .use(Tabbar)
        .use(TabbarItem)
        .use(Icon)
        .use(Cell)
        .use(Search)
        .use(Swipe)
        .use(SwipeItem)
        .use(Grid)
        .use(GridItem)
        .use(Sidebar)
        .use(SidebarItem)
        .use(Tab)
        .use(Tabs)
        .use(VanImage)
        .use(Lazyload)
        .use(SubmitBar)
        .use(Empty)
        .use(ActionBar)
        .use(ActionBarIcon)
        .use(ActionBarButton)
        .use(ActionSheet)
        .use(Checkbox)
        .use(SwipeCell)
        .use(Stepper)
        ;
}