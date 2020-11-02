import { ModalOptions } from './../../models/modal-options';
import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  EmbeddedViewRef,
  Injectable,
  Injector,
  Renderer2,
  RendererFactory2,
} from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private modalsReferences: {
    [key: string]: (ComponentRef<any> | Subject<any>)[];
  } = {};
  private id = 0;
  private renderer: Renderer2;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector,
    private appRef: ApplicationRef,
    private rendererFactory: RendererFactory2
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  private createModalRef = (modalComponent: any, Component: any) => {
    const modalContainer = this.componentFactoryResolver
      .resolveComponentFactory(modalComponent)
      .create(this.injector);
    const injectedComponent = this.componentFactoryResolver
      .resolveComponentFactory(Component)
      .create(this.injector);
    this.modalsReferences[`modalNumber${this.id}`] = [
      modalContainer,
      injectedComponent,
    ];
  };

  private attachModalView = (key: string) => {
    const [modalContainer, injectedComponent] = this.modalsReferences[key];
    this.appRef.attachView((modalContainer as ComponentRef<any>).hostView);
    this.appRef.attachView((injectedComponent as ComponentRef<any>).hostView);
    const parentELement = ((modalContainer as ComponentRef<any>)
      .hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    const componentContainer = parentELement.querySelector('.modal__component');
    const childELement = ((injectedComponent as ComponentRef<any>)
      .hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    this.renderer.appendChild(componentContainer, childELement);
    this.renderer.appendChild(document.body, parentELement);
    this.renderer.setAttribute(
      parentELement,
      'modalid',
      `modalNumber${this.id}`
    );
  };

  private createSubject = (key: string): Subject<any> => {
    const dataSubject = new Subject();
    this.modalsReferences[key].push(dataSubject);
    return this.modalsReferences[key][2] as Subject<any>;
  };

  private passDataToModalComponent = (
    modalOptions: ModalOptions,
    key: string
  ) => {
    (this.modalsReferences[key][0] as ComponentRef<
      any
    >).instance.options = modalOptions;
  };

  private passDataToInjectedComponent = (
    modalOptions: ModalOptions,
    key: string
  ) => {
    // pass key to injected component to emit data after close
    (this.modalsReferences[key][1] as ComponentRef<any>).instance.key = key;

    // pass any data to injected component
    if (modalOptions?.data) {
      (this.modalsReferences[key][1] as ComponentRef<any>).instance.passData =
        modalOptions.data;
    }
  };

  public instantinateModal = (
    modalComponent: any,
    Component: any,
    modalOptions: ModalOptions = null
  ): Subject<any> => {
    const key = `modalNumber${this.id}`;
    this.createModalRef(modalComponent, Component);
    this.attachModalView(key);
    this.passDataToModalComponent(modalOptions, key);
    this.passDataToInjectedComponent(modalOptions, key);
    this.id++;
    return this.createSubject(key);
  };

  public closeModal = (key: string): void => {
    this.appRef.detachView(
      (this.modalsReferences[key][1] as ComponentRef<any>).hostView
    );
    this.appRef.detachView(
      (this.modalsReferences[key][0] as ComponentRef<any>).hostView
    );
    const { [key]: remove, ...newModalReferences } = this.modalsReferences;
    this.modalsReferences = newModalReferences;
  };

  public emitData = (key: string, data: any) => {
    (this.modalsReferences[key][2] as Subject<any>).next(data);
  };

  public resolveModal = (key: string, data: any = null) => {
    if (data) {
      this.emitData(key, data);
    }
    this.closeModal(key);
  };
}
