import { Injectable } from '@angular/core';
import { PORTFOLIO_CONTENT } from './portfolio.data';
import { PortfolioContent } from './models/portfolio.model';

@Injectable({ providedIn: 'root' })
export class PortfolioService {
  readonly content: PortfolioContent = PORTFOLIO_CONTENT;
}
