import { ComponentFixture, getTestBed, TestBed } from '@angular/core/testing';
import { Router, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HomeComponent } from '../home/home.component';

import { LoginComponent } from './login.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  }
]

fdescribe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;
  let injector: TestBed;

  beforeEach(async () => {
    // preparando o modulo para teste
    // aqui colocamos tudo que o componente vai utilizar
    // outros componentes, services, modulos, etc..
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [RouterTestingModule.withRoutes(routes)]
    })
    .compileComponents();
  });

  beforeEach(() => {
    // criando o componente
    fixture = TestBed.createComponent(LoginComponent);
    // pegando ao instancia do componente criado
    component = fixture.componentInstance;
    //aplicando as mudancas no dom
    fixture.detectChanges();

    injector = getTestBed();
    router = injector.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to home', () =>{
    
    //preparacao
    spyOn(router, 'navigate');
    const button: HTMLButtonElement = fixture.nativeElement.querySelector('#btnLogin')
    
    
    //execucao
    button.click();
    
    //verificacao
    expect(router.navigate).toHaveBeenCalledWith(["home"]);

  })


});
