import { JwtPayload } from 'jsonwebtoken';

export interface JwtAuthPayload extends JwtPayload {
  id: string;
  company_id: string;
}
