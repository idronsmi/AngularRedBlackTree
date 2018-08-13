import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NodeComponent } from './node';
import { TreeRoutingModule } from './tree-routing.module';
import { TreeComponent } from './tree.component';

@NgModule({
  imports: [
    CommonModule,
    TreeRoutingModule
  ],
  exports: [TreeComponent],
  declarations: [TreeComponent, NodeComponent]
})
export class TreeModule { }
