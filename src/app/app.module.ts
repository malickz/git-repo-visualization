import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { D3Service } from 'd3-ng2-service';
import {TestD3Component} from "./test-d3/test-d3.component";
import { DragZoom2Component } from './drag-zoom-2/drag-zoom-2.component';
import { PostsComponent } from './posts/posts.component';
import {RouterModule} from "@angular/router";
import {PostsService} from "./posts.service";
import { GitHubComponent } from './git-hub/git-hub.component';
import {GitHubService} from "./git-hub.service";
import { GitBlocksComponent } from './git-blocks/git-blocks.component';
import { CreateGitTreeComponent } from './create-git-tree/create-git-tree.component';
import { D3ComponentComponent } from './d3-component/d3-component.component';
import { TreemapComponent } from './d3-component/treemap/treemap.component';
import { SunburstComponent } from './d3-component/sunburst/sunburst.component';
import {TreeDataService} from "./tree-data.service";
import { ColoredLinesComponent } from './colored-lines/colored-lines.component';
import { FunctionDominantComponent } from './function-dominant/function-dominant.component';
import {FlexLayoutModule} from "../../server/tmp/node_modules/@angular/flex-layout";
import { FunctionMetricComponent } from './function-metric/function-metric.component';

// Define the routes
const ROUTES = [

  {
    path: '',
    component: AppComponent
  },
  {
    path: 'posts',
    component: PostsComponent
  },
  {
    path: 'git',
    component: GitHubComponent
  },
  {
    path: 'gitBlock',
    component: GitBlocksComponent
  },
  {
    path: 'createTree',
    component: CreateGitTreeComponent
  },
  {
    path: 'treeMap',
    component: TreemapComponent
  },
  {
    path: 'drag',
    component: DragZoom2Component
  },
  {
    path: 'lineGraph',
    component: ColoredLinesComponent
  },
  {
    path: 'lineGraphFun',
    component: FunctionDominantComponent
  },
  {
    path: 'functionDominance',
    component: FunctionMetricComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    TestD3Component,
    DragZoom2Component,
    PostsComponent,
    GitHubComponent,
    GitBlocksComponent,
    CreateGitTreeComponent,
    D3ComponentComponent,
    TreemapComponent,
    SunburstComponent,
    ColoredLinesComponent,
    FunctionDominantComponent,
    FunctionMetricComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    FlexLayoutModule,
    RouterModule.forRoot(ROUTES) // Add routes to the app
  ],
  providers: [
    D3Service,
    PostsService,
    GitHubService,
    TreeDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
