import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ServerModel } from '../models/server.model';
import { LIVE_ANNOUNCER_ELEMENT_TOKEN } from '@angular/cdk/a11y';

@Injectable({ providedIn: 'root' })
export class ServerService {
  public Servers = new BehaviorSubject<ServerModel[]>([
    {
      name: 'Server1',
      banner: '../../../../../assets/login-background.jpg',
      description:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nemo aspernatur, eligendi adipisci accusamus ipsam unde consectetur nesciunt laboriosam ut pariatur quo asperiores rem iure, error sunt tempora hic odit alias earum commodi. Laborum molestias corporis doloribus corrupti minus quos ut recusandae quod est tempora repudiandae iure esse consectetur odit vel iste ipsum quasi, aspernatur debitis rerum explicabo ratione hic delectus magnam! Necessitatibus vero beatae ab nobis fugiat nihil autem porro atque incidunt explicabo blanditiis aperiam aut accusamus repellendus, iusto placeat qui vitae amet. Exercitationem doloremque ex natus nisi perferendis a modi tempore voluptate quisquam facere, minima facilis? Magni, recusandae natus!',
    },
    {
      name: 'Server2',
      banner: '../../../../../assets/background1.jpg',
      description:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nemo aspernatur, eligendi adipisci accusamus ipsam unde consectetur nesciunt laboriosam ut pariatur quo asperiores rem iure, error sunt tempora hic odit alias earum commodi. Laborum molestias corporis doloribus corrupti minus quos ut recusandae quod est tempora repudiandae iure esse consectetur odit vel iste ipsum quasi, aspernatur debitis rerum explicabo ratione hic delectus magnam! Necessitatibus vero beatae ab nobis fugiat nihil autem porro atque incidunt explicabo blanditiis aperiam aut accusamus repellendus, iusto placeat qui vitae amet. Exercitationem doloremque ex natus nisi perferendis a modi tempore voluptate quisquam facere, minima facilis? Magni, recusandae natus!',
    },
    { name: 'Server3', banner: '../../../../../assets/login-background.jpg' },
    { name: 'Server3', banner: '../../../../../assets/login-background.jpg' },
    { name: 'Server3', banner: '../../../../../assets/login-background.jpg' },
    { name: 'Server3', banner: '../../../../../assets/login-background.jpg' },
    { name: 'Server3', banner: '../../../../../assets/login-background.jpg' },
    { name: 'Server3', banner: '../../../../../assets/login-background.jpg' },
    { name: 'Server3', banner: '../../../../../assets/login-background.jpg' },
    { name: 'Server3', banner: '../../../../../assets/login-background.jpg' },
    { name: 'Server3', banner: '../../../../../assets/login-background.jpg' },
    { name: 'Server3', banner: '../../../../../assets/login-background.jpg' },
    { name: 'Server3', banner: '../../../../../assets/login-background.jpg' },
    { name: 'Server3', banner: '../../../../../assets/login-background.jpg' },
    { name: 'Server3', banner: '../../../../../assets/login-background.jpg' },
    { name: 'Server3', banner: '../../../../../assets/login-background.jpg' },
    { name: 'Server3', banner: '../../../../../assets/login-background.jpg' },
    { name: 'Server3', banner: '../../../../../assets/login-background.jpg' },
    { name: 'Server3', banner: '../../../../../assets/login-background.jpg' },
  ]);
  getServers() {
    return this.Servers.asObservable();
  }
}
