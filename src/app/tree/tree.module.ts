import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatCardModule, MatInputModule } from '@angular/material';
import { StoreModule } from '@ngrx/store';

import { LineComponent } from './line/line.component';
import { NodeComponent } from './node';
import { TreeRoutingModule } from './tree-routing.module';
import { reducer } from './tree.reducer';
import { TreeComponent } from './tree/tree.component';
import { SvgPanZoomModule } from '../svg-pan-zoom';

@NgModule({
  imports: [
    CommonModule,
    TreeRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    FormsModule,
    SvgPanZoomModule,
    StoreModule.forFeature('tree', reducer)
  ],
  exports: [TreeComponent],
  declarations: [TreeComponent, NodeComponent, LineComponent]
})
export class TreeModule { }
