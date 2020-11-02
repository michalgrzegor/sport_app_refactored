export interface ModalOptions {
  title: string;
  style?: StyleOption[];
  data?: ModalDataOptions;
}

export interface StyleOption {
  [key: string]: string;
}

export interface ModalDataOptions {
  [key: string]: any;
}
