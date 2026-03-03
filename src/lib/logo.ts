// Logo as base64 data URI for use in emails and PDFs
// This ensures the logo renders correctly in all environments (local, production, emails, PDFs)

const svgContent = `<svg version="1.2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1170 263" width="1170" height="263">
	<title>Skillar</title>
	<defs>
		<clipPath clipPathUnits="userSpaceOnUse" id="cp1">
			<path d=""/>
		</clipPath>
		<clipPath clipPathUnits="userSpaceOnUse" id="cp2">
			<path d="m15.67 12.67h237.33v237.33h-237.33z"/>
		</clipPath>
		<clipPath clipPathUnits="userSpaceOnUse" id="cp3">
			<path d="m15.85 14h235.82v235.41h-235.82z"/>
		</clipPath>
		<image width="864" height="864" id="img1" href="data:image/png;base64,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"/>
		<clipPath clipPathUnits="userSpaceOnUse" id="cp4">
			<path d="m15.85 13.41h235.85v235.85h-235.85z"/>
		</clipPath>
		<clipPath clipPathUnits="userSpaceOnUse" id="cp5">
			<path d="m33.85 13.41h199.85c9.95 0 18 8.05 18 18v199.85c0 9.94-8.05 18-18 18h-199.85c-9.94 0-18-8.06-18-18v-199.85c0-9.95 8.06-18 18-18z"/>
		</clipPath>
		<clipPath clipPathUnits="userSpaceOnUse" id="cp6">
			<path d="m15.67 12.67h237.33v237.33h-237.33z"/>
		</clipPath>
		<clipPath clipPathUnits="userSpaceOnUse" id="cp7">
			<path d="m15.85 13.41h235.85v235.85h-235.85z"/>
		</clipPath>
		<clipPath clipPathUnits="userSpaceOnUse" id="cp8">
			<path d="m33.85 13.41h199.85c9.95 0 18 8.05 18 18v199.85c0 9.94-8.05 18-18 18h-199.85c-9.94 0-18-8.06-18-18v-199.85c0-9.95 8.06-18 18-18z"/>
		</clipPath>
		<clipPath clipPathUnits="userSpaceOnUse" id="cp9">
			<path d="m93.69 117.37h80.17v80.18h-80.17z"/>
		</clipPath>
		<clipPath clipPathUnits="userSpaceOnUse" id="cp10">
			<path d="m133.78 117.37c-22.14 0-40.09 17.95-40.09 40.09 0 22.14 17.95 40.09 40.09 40.09 22.14 0 40.08-17.95 40.08-40.09 0-22.14-17.94-40.09-40.08-40.09z"/>
		</clipPath>
		<clipPath clipPathUnits="userSpaceOnUse" id="cp11">
			<path d="m93 116.67h81.33v81.33h-81.33z"/>
		</clipPath>
		<clipPath clipPathUnits="userSpaceOnUse" id="cp12">
			<path d="m93.69 117.37h80.17v80.18h-80.17z"/>
		</clipPath>
		<clipPath clipPathUnits="userSpaceOnUse" id="cp13">
			<path d="m133.78 117.37c-22.14 0-40.09 17.95-40.09 40.09 0 22.14 17.95 40.09 40.09 40.09 22.14 0 40.08-17.95 40.08-40.09 0-22.14-17.94-40.09-40.08-40.09z"/>
		</clipPath>
		<clipPath clipPathUnits="userSpaceOnUse" id="cp14">
			<path d="m36.33 56.64h194.93v121h-194.93z"/>
		</clipPath>
		<clipPath clipPathUnits="userSpaceOnUse" id="cp15">
			<path d="m49.88 65.12h167.78v104.5h-167.78z"/>
		</clipPath>
	</defs>
	<style>
		.s0 { fill: #4f46e5 } 
		.s1 { fill: #ffffff } 
	</style>
	<g id="Clip-Path" clip-path="url(#cp1)">
		<g>
			<g>
				<g id="Clip-Path" clip-path="url(#cp2)">
					<g>
						<g id="Clip-Path" clip-path="url(#cp3)">
							<g>
								<g>
									<g>
										<use  href="#img1" transform="matrix(.273,0,0,.273,15.848,13.405)"/>
									</g>
								</g>
							</g>
						</g>
					</g>
				</g>
			</g>
		</g>
	</g>
	<g>
		<g>
			<g>
				<path class="s0" d="m359.04 142.34q-64.96-0.66-64.96-41.16 0-11.56 4.57-20.8 4.56-9.25 12.89-15.68 8.35-6.46 20.25-9.9 11.89-3.45 26.81-3.46 27.58 0 44.61 13.36 17.02 13.33 21.92 38.7h-22.25q-7.13-30.7-42.94-30.7-20.69 0-32.38 7.79-11.68 7.79-11.68 21.35-0.01 4.9 2.22 8.46 2.23 3.56 7.34 5.79 5.12 2.21 13.25 3.34 8.12 1.1 19.91 1.33 33.38 0.44 49.05 11.12 15.68 10.67 15.68 32.92 0 21.81-16.45 34.38-16.47 12.56-45.61 12.56-29.37 0-46.5-13.23-17.12-13.23-20.25-38.81h22.25q1.77 15.79 12.56 23.25 10.79 7.43 31.05 7.43 20.01 0.01 30.68-6.89 10.69-6.89 10.69-19.36 0-5.99-2.23-10.1-2.21-4.13-7.23-6.69-5-2.56-13.12-3.66-8.11-1.13-20.13-1.34z"/>
			</g>
		</g>
	</g>
	<g>
		<g>
			<g>
				<path class="s0" d="m483.62 142.78q14.92 0 22.36-4.67 7.45-4.68 9.25-17.58l2.66-22.48h21.59l-2.69 22.04q-1.77 14.9-6.56 22.79-4.78 7.9-13.67 10.8 8.23 2.67 13.33 11.35 5.13 8.67 6.9 22.25l2.69 22.02h-21.59l-2.66-22.48q-1.57-13.12-9.13-17.79-7.56-4.67-22.48-4.67h-23.14v44.94h-21.57v-155.73h21.57v89.21z"/>
			</g>
		</g>
	</g>
	<g>
		<g>
			<g>
				<path class="s0" d="m555.7 98.05h21.58v111.25h-21.58zm-2.44-34.48q0-6 3.67-9.67 3.67-3.66 9.67-3.66 5.78 0 9.46 3.66 3.66 3.67 3.66 9.67 0 6.03-3.66 9.69-3.68 3.67-9.46 3.67-6 0-9.67-3.67-3.67-3.66-3.67-9.69z"/>
			</g>
		</g>
	</g>
	<g>
		<g>
			<g>
				<path class="s0" d="m641.14 187.28v22.02q-11.79 1.1-19.58-0.56-7.79-1.66-12.48-6.77-4.67-5.13-6.56-14.13-1.88-9.01-1.88-22.81v-111.46h21.79v111.9q0 6.69 0.78 11.02 0.79 4.34 2.79 6.66 1.99 2.34 5.66 3.23 3.69 0.9 9.48 0.9z"/>
			</g>
		</g>
	</g>
	<g>
		<g>
			<g>
				<path class="s0" d="m696.76 187.28v22.02q-11.8 1.1-19.58-0.56-7.8-1.66-12.48-6.77-4.67-5.13-6.56-14.13-1.88-9.01-1.88-22.81v-111.46h21.79v111.9q0 6.69 0.77 11.02 0.79 4.34 2.79 6.66 2 2.34 5.67 3.23 3.69 0.9 9.48 0.9z"/>
			</g>
		</g>
	</g>
	<g>
		<g>
			<g>
				<path class="s0" d="m764.82 211.53q-12.69 0-23.14-4.1-10.44-4.13-17.9-11.59-7.46-7.45-11.58-17.91-4.11-10.46-4.11-23.13 0-12.68 4.11-23.48 4.12-10.79 11.58-18.69 7.46-7.89 17.9-12.33 10.45-4.45 23.14-4.46 23.35 0 38.38 15.36 15.01 15.33 18.35 43.14l6.69 54.96h-21.81l-1.57-12.46q-7.33 7.13-17.45 10.92-10.13 3.77-22.59 3.77zm34.94-57.19q0-7.76-2.56-14.44-2.57-6.68-7.13-11.58-4.56-4.89-11.02-7.56-6.44-2.67-14.23-2.67-7.79 0-14.25 2.67-6.44 2.67-11.1 7.56-4.67 4.9-7.23 11.58-2.56 6.68-2.56 14.44-0.01 15.8 9.66 25.38 9.69 9.56 25.48 9.56 15.79 0 25.36-9.56 9.58-9.58 9.58-25.38z"/>
			</g>
		</g>
	</g>
	<g>
		<g>
			<g>
				<path class="s0" d="m905.65 118.09q-17.13 0.01-27.48 9.9-10.35 9.9-10.35 26.35v54.96h-21.56v-54.5q-0.01-12.68 4.1-23.48 4.12-10.79 11.56-18.69 7.46-7.89 17.92-12.33 10.45-4.45 23.14-4.46 9.56 0 17.8 2.67v21.79q-3.57-1.1-7.46-1.65-3.9-0.56-7.67-0.56z"/>
			</g>
		</g>
	</g>
	<g>
		<g>
			<g>
				<path class="s0" d="m934.57 196.61q-0.01-6.89 4.1-11 4.13-4.12 10.81-4.12 6.89 0 11 4.12 4.13 4.11 4.13 11 0 6.69-4.13 10.82-4.11 4.1-11 4.1-6.68 0-10.81-4.1-4.11-4.13-4.1-10.82z"/>
			</g>
		</g>
	</g>
	<g>
		<g>
			<g>
				<path class="s0" d="m1034.9 211.53q-12.69 0-23.15-4.1-10.44-4.13-17.89-11.59-7.46-7.45-11.59-17.91-4.1-10.46-4.1-23.13 0-12.68 4.1-23.48 4.13-10.79 11.59-18.69 7.45-7.89 17.89-12.33 10.46-4.45 23.15-4.46 23.35 0 38.37 15.36 15.02 15.33 18.36 43.14l6.69 54.96h-21.82l-1.56-12.46q-7.33 7.13-17.46 10.92-10.12 3.77-22.58 3.77zm34.94-57.19q0-7.76-2.57-14.44-2.56-6.68-7.12-11.58-4.57-4.89-11.02-7.56-6.44-2.67-14.23-2.67-7.8 0-14.25 2.67-6.44 2.67-11.1 7.56-4.67 4.9-7.23 11.58-2.57 6.68-2.57 14.44 0 15.8 9.67 25.38 9.69 9.56 25.48 9.56 15.79 0 25.35-9.56 9.58-9.58 9.59-25.38z"/>
			</g>
		</g>
	</g>
	<g>
		<g>
			<g>
				<path class="s0" d="m1118.77 98.05h21.58v111.25h-21.58zm-2.44-34.48q0-6 3.67-9.67 3.66-3.66 9.67-3.66 5.78 0 9.45 3.66 3.67 3.67 3.67 9.67 0 6.03-3.67 9.69-3.67 3.67-9.45 3.67-6.01 0-9.67-3.67-3.67-3.66-3.67-9.69z"/>
			</g>
		</g>
	</g>
	<g id="Clip-Path" clip-path="url(#cp4)">
		<g>
			<g id="Clip-Path" clip-path="url(#cp5)">
				<g>
					<g>
						<g id="Clip-Path" clip-path="url(#cp6)">
							<g>
								<g id="Clip-Path" clip-path="url(#cp7)">
									<g>
										<g id="Clip-Path" clip-path="url(#cp8)">
											<g>
												<path class="s0" d="m15.85 13.41h235.85v235.85h-235.85z"/>
											</g>
										</g>
									</g>
								</g>
							</g>
						</g>
					</g>
				</g>
			</g>
		</g>
	</g>
	<g id="Clip-Path" clip-path="url(#cp9)">
		<g>
			<g id="Clip-Path" clip-path="url(#cp10)">
				<g>
					<g>
						<g id="Clip-Path" clip-path="url(#cp11)">
							<g>
								<g id="Clip-Path" clip-path="url(#cp12)">
									<g>
										<g id="Clip-Path" clip-path="url(#cp13)">
											<g>
												<path class="s1" d="m93.69 117.37h80.17v80.18h-80.17z"/>
											</g>
										</g>
									</g>
								</g>
							</g>
						</g>
					</g>
				</g>
			</g>
		</g>
	</g>
	<g id="Clip-Path" clip-path="url(#cp14)">
		<g>
			<path class="s0" d="m133.77 56.64l-97.5 60.73 97.5 60.73 97.49-60.73z"/>
		</g>
	</g>
	<g id="Clip-Path" clip-path="url(#cp15)">
		<g>
			<path class="s1" d="m133.77 65.12l-83.89 52.25 83.89 52.25 83.89-52.25z"/>
		</g>
	</g>
</svg>`;

// Convert SVG to base64 data URI
export const SKILLAR_LOGO_DATA_URI = `data:image/svg+xml;base64,${Buffer.from(svgContent).toString('base64')}`;

// Export raw SVG for cases where inline SVG is needed
export const SKILLAR_LOGO_SVG = svgContent;
