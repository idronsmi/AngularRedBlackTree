import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatInputModule } from '@angular/material';
import { StoreModule } from '@ngrx/store';

import { NodeComponent } from './node';
import { TreeRoutingModule } from './tree-routing.module';
import { TreeComponent } from './tree.component';
import { reducer } from './tree.reducer';
import { LineComponent } from './line/line.component';

@NgModule({
  imports: [
    CommonModule,
    TreeRoutingModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    StoreModule.forFeature('tree', reducer)
  ],
  exports: [TreeComponent],
  declarations: [TreeComponent, NodeComponent, LineComponent]
})
export class TreeModule { }
