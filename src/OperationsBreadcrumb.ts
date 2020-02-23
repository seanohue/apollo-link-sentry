import { Severity } from '@sentry/browser';

import { ApolloLinkSentry } from './types';
import { stringifyObject } from './utils';

export class OperationsBreadcrumb {
  public flushed: boolean;
  private readonly breadcrumb: ApolloLinkSentry.Breadcrumb.Data;

  /**
   * Start a new ApolloLinkSentry Breadcrumb
   */
  constructor() {
    this.breadcrumb = {};
    this.flushed = false;

    this
      .level(Severity.Log)
      .category();
  }

  /**
   * Sets the breadcrumb's log level
   * @param level
   */
  level = (level: Severity): OperationsBreadcrumb => {
    this.breadcrumb.level = level;
    return this;
  };

  /**
   * Sets the breadcrumb's category, which is prefixed with `graphQL`
   * @param category
   */
  category = (category?: ApolloLinkSentry.Breadcrumb.Category): OperationsBreadcrumb => {
    this.breadcrumb.category = `gql ${category || ''}`.trim();
    return this;
  };

  /**
   * Set the breadcrumb's message, normally the graphQL operation's name
   * @param message
   */
  message = (message?: string): OperationsBreadcrumb => {
    this.breadcrumb.message = message;
    return this;
  };

  /**
   * Set the breadcrumb's extra data
   * @param data
   */
  data = (data: ApolloLinkSentry.Operation.Data): OperationsBreadcrumb => {
    this.breadcrumb.data = {
      ...this.breadcrumb.data,
      ...data,
    };

    return this;
  };

  /**
   * Set the breadcrumb's type, normally `http`
   * @param type
   */
  type = (type: string): OperationsBreadcrumb => {
    this.breadcrumb.type = type;
    return this;
  };

  /**
   * We flush the breadcrumb after it's been sent to Sentry, so we can prevent duplicates
   */
  flush = (): ApolloLinkSentry.Breadcrumb.Data => {
    this.flushed = true;
    return this.breadcrumb;
  };

  /**
   * Stringify the breadcrumb, used for debugging purposes
   */
  /* istanbul ignore next */
  toString = (): string => stringifyObject(this.breadcrumb);
}
