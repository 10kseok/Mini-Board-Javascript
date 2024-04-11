import { SetMetadata } from "@nestjs/common";

export const jwtConstants = {
    secret: 'd3fGzDNoyc4HZ9aVGIIKJJZc4SdrIS8Dno4USsfV526RkYJOfM3xOXuc0NCLR5c4H18VprE3JFrOj8gUiZfBTrFgNY0ZoAmMSMFb8Oc8LB31eeBBGLaSQnm6KchC8ZPMvOaIfryEAZMEns8LlpaZW621TWNcxaNu9ZEhRaNz6iRd4gplGeSp5EANDBfxB9ubjvFUpiopOXhSmonv9DEGwh4QKO0Nt5COKTcoeRvkg9UYXa3wOKNmQEsQrjHwpH64'
}

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);