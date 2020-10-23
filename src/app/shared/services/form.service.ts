import {
  ElementRef,
  Injectable,
  QueryList,
  Renderer2,
  RendererFactory2,
  ViewContainerRef,
} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  private renderer: Renderer2;

  constructor(private rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  public toggleForm = (
    index: number,
    formToExpandNodesArray: QueryList<ViewContainerRef>,
    expandBtnNodesArray: QueryList<ViewContainerRef>
  ) => {
    const container = formToExpandNodesArray.toArray()[index].element
      .nativeElement;
    const button = expandBtnNodesArray.toArray()[index].element.nativeElement;
    if (Array.from(container.classList).includes('opened')) {
      this.renderer.setStyle(button, 'transform', 'rotate(0deg)');
      this.renderer.removeClass(container, 'opened');
    } else {
      this.renderer.setStyle(button, 'transform', 'rotate(180deg)');
      this.renderer.addClass(container, 'opened');
    }
  };

  private checkEmpty = (inputElement: ElementRef<any>) => {
    if (inputElement.nativeElement.value.length > 0) {
      this.renderer.removeClass(inputElement.nativeElement, 'value--empty');
    } else {
      this.renderer.addClass(inputElement.nativeElement, 'value--empty');
    }
  };

  private addBlurEvents = (inputNodes: QueryList<ViewContainerRef>) => {
    inputNodes
      .toArray()
      .forEach((input) =>
        this.renderer.listen(input.element.nativeElement, 'blur', () =>
          this.checkEmpty(input.element)
        )
      );
  };

  private checkAllInputs = (inputNodes: QueryList<ViewContainerRef>) => {
    inputNodes.toArray().forEach((input) => this.checkEmpty(input.element));
  };

  public addInputFuncionality = (inputNodes: QueryList<ViewContainerRef>) => {
    this.checkAllInputs(inputNodes);
    this.addBlurEvents(inputNodes);
  };
}
