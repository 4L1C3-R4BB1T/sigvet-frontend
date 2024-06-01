import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-awaiting-release',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './awaiting-release.component.html',
  styleUrl: './awaiting-release.component.scss'
})
export class AwaitingReleaseComponent {

  authService = inject(AuthService);

}
