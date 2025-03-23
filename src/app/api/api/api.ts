export * from './roleController.service';
import { RoleControllerService } from './roleController.service';
export * from './userController.service';
import { UserControllerService } from './userController.service';
export const APIS = [RoleControllerService, UserControllerService];
