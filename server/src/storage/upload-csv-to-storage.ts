import { randomUUID } from "node:crypto";
import { basename, extname } from "node:path";
import { Readable } from "node:stream";
import { env } from "@/env";
import { client } from "@/storage/client";
import { Upload } from "@aws-sdk/lib-storage";
import { z } from "zod";

const uploadCsvToStorageInput = z.object({
	folder: z.enum(["downloads"]),
	fileName: z.string(),
	contentType: z.string(),
	contentStream: z.instanceof(Readable),
});

type UploadCsvToStorageInput = z.input<typeof uploadCsvToStorageInput>;

export async function uploadCsvToStorage(input: UploadCsvToStorageInput) {
	const { folder, fileName, contentType, contentStream } =
		uploadCsvToStorageInput.parse(input);

	const fileExtension = extname(fileName);
	const fileNameWithoutExtension = basename(fileName, fileExtension);
	const sanitizedFileName = fileNameWithoutExtension.replace(
		/[^a-zA-Z0-9]/g,
		"",
	);
	const sanitizedFileNameWithExtension = `${sanitizedFileName}${fileExtension}`;

	const uniqueFileName = `${folder}/${randomUUID()}-${sanitizedFileNameWithExtension}`;

	const upload = new Upload({
		client,
		params: {
			Key: uniqueFileName,
			Bucket: env.CLOUDFLARE_BUCKET,
			Body: contentStream,
			ContentType: contentType,
		},
	});

	await upload.done();

	return {
		key: uniqueFileName,
		url: new URL(uniqueFileName, env.CLOUDFLARE_PUBLIC_URL).toString(),
	};
}
