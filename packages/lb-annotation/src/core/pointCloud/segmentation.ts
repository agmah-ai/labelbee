/**
 * @file PointCloud Segmentation Operation
 * @author Laoluo <ron.f.luo@gmail.com>
 * @createdate 2023-05-05
 */

import LassoSelector from './selector/lassoSelector';
import PointCloudStore from './store';
import CircleSelector from './selector/circleSelector';

interface IProps {
  dom: HTMLElement;
  store: PointCloudStore;
}

class PointCloudSegmentOperation {
  private dom: HTMLElement;

  // Operation Selector
  public currentTool: LassoSelector | CircleSelector;

  public store: PointCloudStore;

  // Selector
  public lassoSelector: LassoSelector;

  public circleSelector: CircleSelector;

  constructor(props: IProps) {
    this.dom = props.dom;
    this.store = props.store;

    this.lassoSelector = new LassoSelector(this.store);
    this.circleSelector = new CircleSelector(this.store);
    this.currentTool = this.circleSelector;
    this.dom.addEventListener('pointermove', this.onMouseMove.bind(this));
    this.dom.addEventListener('pointerdown', this.onMouseDown.bind(this));
    this.dom.addEventListener('pointerup', this.onMouseUp.bind(this));
    this.updateSelector2Lasso = this.updateSelector2Lasso.bind(this);
    this.updateSelector2Circle = this.updateSelector2Circle.bind(this);

    // this.setupRaycaster();
  }

  public getCoordinate(e: MouseEvent) {
    const bounding = this.dom.getBoundingClientRect();
    return {
      x: e.clientX - bounding.left,
      y: e.clientY - bounding.top,
    };
  }

  public get forbidOperation() {
    return this.store.forbidOperation;
  }

  public updateSelector2Lasso() {
    this.currentTool = this.lassoSelector;
  }

  public updateSelector2Circle() {
    this.currentTool = this.circleSelector;
  }

  public onMouseMove = (iev: MouseEvent) => {
    if (this.forbidOperation) {
      return;
    }

    const ev = {
      offsetX: iev.offsetX,
      offsetY: iev.offsetY,
      button: iev.buttons,
    };

    this.currentTool.mouseMove(ev as MouseEvent);
  };

  public onMouseDown = (iev: MouseEvent) => {
    if (this.forbidOperation) {
      return;
    }

    this.currentTool.mouseDown(iev);
  };

  public onMouseUp = (iev: MouseEvent) => {
    if (this.forbidOperation) {
      return;
    }

    this.currentTool.mouseUp(iev);
  };

  // public setupRaycaster() {
  //   const boundingBox = { x: 10, y: 10, z: 10 };
  //   const numberOfPoints = 10;

  //   this.raycaster = new THREE.Raycaster();
  //   const threshold = Math.cbrt((boundingBox.x * boundingBox.y * boundingBox.z) / numberOfPoints) / 3;
  //   if (this.raycaster) {
  //     // this.raycaster.params.Points.threshold = threshold;
  //     // this.raycaster.linePrecision = 0.1;
  //   }
  // }
}

export { PointCloudSegmentOperation };
