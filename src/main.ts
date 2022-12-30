import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RoleService } from './modules/role/service/role.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);

  const roleService = app.get(RoleService);
  await roleService.init();
}
bootstrap();
