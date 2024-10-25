import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { detecHtmlInjection } from '@common/utils/security/detect-html-injection';

export function HtmlInjectionValidation(validationOptions?: ValidationOptions) {
  return (target: any, propertyKey: string) => {
    registerDecorator({
      target: target.constructor,
      propertyName: propertyKey,
      options: validationOptions,
      validator: HtmlInjectionValidator,
    });
  };
}

@ValidatorConstraint({ async: true })
@Injectable()
export class HtmlInjectionValidator implements ValidatorConstraintInterface {
  validate(value: string): boolean {
    return detecHtmlInjection(value);
  }

  defaultMessage(): string {
    return 'HTML injection detected';
  }
}
