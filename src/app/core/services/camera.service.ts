import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CameraService {
  private stream: MediaStream | null = null;

  constructor() {}

  // درخواست دسترسی به دوربین
  async startCamera(): Promise<MediaStream | null> {
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({
        video: true
      });
      return this.stream;
    } catch (err:any) {
      console.error('Error accessing the camera: ', err);
      if (err.name === 'NotAllowedError') {
        alert('Please allow camera access.');
      } else if (err.name === 'NotFoundError') {
        alert('No camera device found.');
      } else {
        alert('An error occurred while accessing the camera.');
      }
      return null;
    }
  }

  // توقف دوربین
  stopCamera() {
    if (this.stream) {
      let tracks = this.stream.getTracks();
      tracks.forEach(track => track.stop());
    }
  }

  // گرفتن عکس از دوربین
  captureImage(videoElement: HTMLVideoElement): string {
    const canvas = document.createElement('canvas');
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;
    const context = canvas.getContext('2d');
    if (context) {
      context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
      return canvas.toDataURL('image/png'); // تصویر را به صورت Base64 برمی‌گرداند
    }
    return '';
  }
}
