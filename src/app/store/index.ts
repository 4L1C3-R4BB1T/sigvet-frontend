import { Menu } from "./models/menu.model";
import { ModalCreateClient } from "./models/modal-create-client.modal";
import SettingMenu from "./models/setting-menu.model";

export interface AppState {
  menu: Menu;
  settingMenu: SettingMenu;
  clientModal: ModalCreateClient;
}
